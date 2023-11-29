using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Service;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Currency> Currencies { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderitem> Orderitems { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Productfile> Productfiles { get; set; }

    public virtual DbSet<Productimage> Productimages { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Shippingmethod> Shippingmethods { get; set; }

    public virtual DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("SBD_ST_PS10_4");

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Categoryid).HasName("SYS_C00523912");

            entity.ToTable("CATEGORIES");

            entity.Property(e => e.Categoryid)
                .HasColumnName("CATEGORYID");
            entity.Property(e => e.Categoryname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CATEGORYNAME");
            entity.Property(e => e.Parentcategoryid)
                .HasColumnName("PARENTCATEGORYID");

            entity.HasOne(d => d.Parentcategory).WithMany(p => p.InverseParentcategory)
                .HasForeignKey(d => d.Parentcategoryid)
                .HasConstraintName("SYS_C00523913");
        });

        modelBuilder.Entity<Currency>(entity =>
        {
            entity.HasKey(e => e.Currencycode).HasName("SYS_C00523911");

            entity.ToTable("CURRENCIES");

            entity.Property(e => e.Currencycode)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("CURRENCYCODE");
            entity.Property(e => e.Exchangerate)
                .HasColumnType("DECIMAL(10,4)")
                .HasColumnName("EXCHANGERATE");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Orderid).HasName("SYS_C00523917");

            entity.ToTable("ORDERS");

            entity.Property(e => e.Orderid)
                .HasColumnName("ORDERID");
            entity.Property(e => e.Orderdate)
                .HasPrecision(6)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("ORDERDATE");
            entity.Property(e => e.Orderstatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ORDERSTATUS");
            entity.Property(e => e.Userid)
                .HasColumnName("USERID");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("FK_USER_ORDERS");
        });

        modelBuilder.Entity<Orderitem>(entity =>
        {
            entity.HasKey(e => e.Orderitemid).HasName("SYS_C00523919");

            entity.ToTable("ORDERITEMS");

            entity.Property(e => e.Orderitemid)
                .HasColumnName("ORDERITEMID");
            entity.Property(e => e.Itemprice)
                .HasColumnType("DECIMAL(10,2)")
                .HasColumnName("ITEMPRICE");
            entity.Property(e => e.Orderid)
                .HasColumnName("ORDERID");
            entity.Property(e => e.Productid)
                .HasColumnName("PRODUCTID");
            entity.Property(e => e.Quantity)
                .HasColumnName("QUANTITY");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderitems)
                .HasForeignKey(d => d.Orderid)
                .HasConstraintName("FK_ORDER_ITEMS_ORDERS");

            entity.HasOne(d => d.Product).WithMany(p => p.Orderitems)
                .HasForeignKey(d => d.Productid)
                .HasConstraintName("FK_ORDER_ITEMS_PRODUCTS");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Paymentid).HasName("SYS_C00523922");

            entity.ToTable("PAYMENTS");

            entity.Property(e => e.Paymentid)
                .HasColumnName("PAYMENTID");
            entity.Property(e => e.Orderid)
                .HasColumnName("ORDERID");
            entity.Property(e => e.Paymentmethod)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PAYMENTMETHOD");
            entity.Property(e => e.Paymentstatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PAYMENTSTATUS");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Orderid)
                .HasConstraintName("FK_PAYMENTS_ORDERS");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Productid).HasName("SYS_C00523916");

            entity.ToTable("PRODUCTS");

            entity.Property(e => e.Productid)
                .HasColumnName("PRODUCTID");
            entity.Property(e => e.Categoryid)
                .HasColumnName("CATEGORYID");
            entity.Property(e => e.Description)
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.Hidden)
                .HasPrecision(1)
                .HasColumnName("HIDDEN");
            entity.Property(e => e.Price)
                .HasColumnType("DECIMAL(10,2)")
                .HasColumnName("PRICE");
            entity.Property(e => e.Productname)
                .HasMaxLength(255)
                .HasColumnName("PRODUCTNAME");
            entity.Property(e => e.Stockquantity)
                .HasColumnName("STOCKQUANTITY");
            entity.Property(e => e.Vatrate)
                .HasColumnType("DECIMAL(4,2)")
                .HasColumnName("VATRATE");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.Categoryid)
                .HasConstraintName("PRODUCTS_FK1");

            entity.HasMany(d => d.Promotions).WithMany(p => p.Products)
                .UsingEntity<Dictionary<string, object>>(
                    "Productpromotion",
                    r => r.HasOne<Promotion>().WithMany()
                        .HasForeignKey("Promotionid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("SYS_C00523931"),
                    l => l.HasOne<Product>().WithMany()
                        .HasForeignKey("Productid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("SYS_C00523930"),
                    j =>
                    {
                        j.HasKey("Productid", "Promotionid").HasName("SYS_C00523929");
                        j.ToTable("PRODUCTPROMOTIONS");
                        j.IndexerProperty<decimal>("Productid")
                            .HasColumnName("PRODUCTID");
                        j.IndexerProperty<decimal>("Promotionid")
                            .HasColumnName("PROMOTIONID");
                    });
        });

        modelBuilder.Entity<Productfile>(entity =>
        {
            entity.HasKey(e => e.Fileid).HasName("SYS_C00523926");

            entity.ToTable("PRODUCTFILES");

            entity.Property(e => e.Fileid)
                .HasColumnName("FILEID");
            entity.Property(e => e.Filedescription)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FILEDESCRIPTION");
            entity.Property(e => e.Filepath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FILEPATH");
            entity.Property(e => e.Productid)
                .HasColumnName("PRODUCTID");

            entity.HasOne(d => d.Product).WithMany(p => p.Productfiles)
                .HasForeignKey(d => d.Productid)
                .HasConstraintName("FK_PRODUCT_FILES_PRODUCTS");
        });

        modelBuilder.Entity<Productimage>(entity =>
        {
            entity.HasKey(e => e.Imageid).HasName("SYS_C00523924");

            entity.ToTable("PRODUCTIMAGES");

            entity.Property(e => e.Imageid)
                .HasColumnName("IMAGEID");
            entity.Property(e => e.Imagepath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IMAGEPATH");
            entity.Property(e => e.Isthumbnail)
                .HasPrecision(1)
                .HasColumnName("ISTHUMBNAIL");
            entity.Property(e => e.Productid)
                .HasColumnName("PRODUCTID");

            entity.HasOne(d => d.Product).WithMany(p => p.Productimages)
                .HasForeignKey(d => d.Productid)
                .HasConstraintName("FK_PRODUCT_IMAGES_PRODUCTS");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.Promotionid).HasName("SYS_C00523928");

            entity.ToTable("PROMOTIONS");

            entity.Property(e => e.Promotionid)
                .HasColumnName("PROMOTIONID");
            entity.Property(e => e.Description)
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.Discountpercentage)
                .HasColumnType("DECIMAL(5,2)")
                .HasColumnName("DISCOUNTPERCENTAGE");
            entity.Property(e => e.Enddate)
                .HasColumnType("DATE")
                .HasColumnName("ENDDATE");
            entity.Property(e => e.Promotionname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROMOTIONNAME");
            entity.Property(e => e.Startdate)
                .HasColumnType("DATE")
                .HasColumnName("STARTDATE");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Reviewid).HasName("SYS_C00523932");

            entity.ToTable("REVIEWS");

            entity.Property(e => e.Reviewid)
                .HasColumnName("REVIEWID");
            entity.Property(e => e.Description)
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.Productid)
                .HasColumnName("PRODUCTID");
            entity.Property(e => e.Rating)
                .HasColumnName("RATING");
            entity.Property(e => e.Userid)
                .HasColumnName("USERID");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.Productid)
                .HasConstraintName("SYS_C00523934");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("SYS_C00523933");
        });

        modelBuilder.Entity<Shippingmethod>(entity =>
        {
            entity.HasKey(e => e.Shippingmethodid).HasName("SYS_C00523914");

            entity.ToTable("SHIPPINGMETHODS");

            entity.Property(e => e.Shippingmethodid)
                .HasColumnName("SHIPPINGMETHODID");
            entity.Property(e => e.Methodname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("METHODNAME");
            entity.Property(e => e.Shippingcost)
                .HasColumnType("DECIMAL(10,2)")
                .HasColumnName("SHIPPINGCOST");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("SYS_C00523915");

            entity.ToTable("USERS");

            entity.Property(e => e.Userid)
                .HasColumnName("USERID");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EMAIL");
            entity.Property(e => e.Newslettersubscription)
                .HasPrecision(1)
                .HasColumnName("NEWSLETTERSUBSCRIPTION");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("PASSWORD");
            entity.Property(e => e.Shippingaddress)
                .HasMaxLength(255)
                .HasColumnName("SHIPPINGADDRESS");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("USERNAME");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
